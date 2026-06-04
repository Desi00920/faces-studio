import { useState, createContext, useContext } from 'react'
import { trpc } from '@/providers/trpc'

// ---- Admin Context ----
interface AdminCtx {
  token: string | null
  login: (token: string) => void
  logout: () => void
}
const AdminContext = createContext<AdminCtx>({ token: null, login: () => {}, logout: () => {} })

/** Admin Login + CMS Dashboard for Daisy */
export default function Admin() {
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem('faces-admin-token') } catch { return null }
  })

  const login = (t: string) => {
    localStorage.setItem('faces-admin-token', t)
    setToken(t)
  }
  const logout = () => {
    localStorage.removeItem('faces-admin-token')
    setToken(null)
  }

  return (
    <AdminContext.Provider value={{ token, login, logout }}>
      {!token ? <AdminLogin /> : <AdminDashboard />}
    </AdminContext.Provider>
  )
}

// ---- Login Screen (no tRPC hooks) ----
function AdminLogin() {
  const { login } = useContext(AdminContext)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Use raw fetch instead of tRPC to avoid hook initialization issues
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/trpc/admin.login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: { password } }),
      })
      const data = await res.json()
      if (data.result?.data?.token) {
        login(data.result.data.token)
      } else if (data.error) {
        setError(data.error.message || 'Login failed')
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Cannot connect to server. The CMS requires the API backend to be running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f6f3ee',
      fontFamily: 'var(--font-body)',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1a1a',
            margin: '0 0 8px',
          }}>
            FACES STUDIO
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#8c8c8c',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Content Manager
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            color: '#8c8c8c',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1.5px solid #e5e5e5',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: '16px',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#ff5757' }}
            onBlur={(e) => { e.target.style.borderColor = '#e5e5e5' }}
          />
          {error && (
            <p style={{ color: '#ff5757', fontSize: '13px', margin: '0 0 12px', lineHeight: 1.5 }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: loading ? '#ccc' : '#1a1a1a',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#ff5757' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1a1a1a' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#ccc',
          marginTop: '24px',
        }}>
          For Daisy — FACES STUDIO CMS
        </p>
      </div>
    </div>
  )
}

// ---- Dashboard (tRPC hooks only rendered after login) ----
function AdminDashboard() {
  const { logout } = useContext(AdminContext)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValues, setEditValues] = useState({ valueDe: '', valueEn: '', imageUrl: '' })
  const [saveMsg, setSaveMsg] = useState('')
  const [showNewForm, setShowNewForm] = useState(false)
  const [newEntry, setNewEntry] = useState({ sectionKey: '', fieldKey: '', valueDe: '', valueEn: '', imageUrl: '', orderNum: '0' })

  const { data: contentData, isLoading, error: listError, refetch } = trpc.content.list.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const updateMutation = trpc.content.update.useMutation({
    onSuccess: () => {
      setSaveMsg('Saved!')
      setTimeout(() => setSaveMsg(''), 2000)
      refetch()
      setEditingId(null)
    },
    onError: (err) => {
      setSaveMsg('Error: ' + err.message)
      setTimeout(() => setSaveMsg(''), 3000)
    },
  })

  const createMutation = trpc.content.create.useMutation({
    onSuccess: () => {
      setNewEntry({ sectionKey: '', fieldKey: '', valueDe: '', valueEn: '', imageUrl: '', orderNum: '0' })
      refetch()
    },
  })

  const startEdit = (row: { id: number; valueDe: string | null; valueEn: string | null; imageUrl: string | null }) => {
    setEditingId(row.id)
    setEditValues({
      valueDe: row.valueDe || '',
      valueEn: row.valueEn || '',
      imageUrl: row.imageUrl || '',
    })
  }

  const handleSave = (id: number) => {
    updateMutation.mutate({
      id,
      valueDe: editValues.valueDe,
      valueEn: editValues.valueEn,
      imageUrl: editValues.imageUrl || undefined,
    })
  }

  const sectionLabels: Record<string, string> = {
    hero: 'Hero',
    about: 'About',
    treatment_bio_needling: 'Bio-Microneedling',
    treatment_signature: 'Signature Ritual',
    treatment_urban: 'Urban Reset',
    treatment_hydra: 'Hydra Renewal',
    treatment_gentleman: 'Gentleman\'s Ritual',
    treatment_clear: 'Clear Skin Therapy',
    treatment_lash: 'Lash Lift',
    addons: 'Add-ons',
    gutscheine: 'Gutscheine',
    contact: 'Contact',
    footer: 'Footer',
  }

  // API Error
  if (listError) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f6f3ee',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 400,
            color: '#f6f3ee',
            margin: 0,
          }}>
            FACES STUDIO <span style={{ color: '#ff5757' }}>CMS</span>
          </h1>
          <button onClick={logout} style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(246,243,238,0.2)',
            backgroundColor: 'transparent',
            color: 'rgba(246,243,238,0.6)',
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            Logout
          </button>
        </div>
        <div style={{
          maxWidth: '600px',
          margin: '60px auto',
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '48px', margin: '0 0 16px' }}>⚠️</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: '#1a1a1a',
            margin: '0 0 12px',
          }}>
            API Not Available
          </h2>
          <p style={{ fontSize: '14px', color: '#8c8c8c', lineHeight: 1.6, margin: '0 0 24px' }}>
            The CMS backend is not running on this deployment. This is expected for static previews — the CMS requires a server with the API running.
          </p>
          <p style={{ fontSize: '13px', color: '#ff5757', backgroundColor: 'rgba(255,87,87,0.08)', padding: '12px 16px', borderRadius: '8px', margin: '0 0 24px' }}>
            Deploy on Vercel with the DATABASE_URL environment variable to use the CMS.
          </p>
          <button onClick={logout} style={{
            padding: '12px 24px',
            borderRadius: '32px',
            border: 'none',
            backgroundColor: '#ff5757',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  // Loading
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f3ee',
        fontFamily: 'var(--font-body)',
      }}>
        <p style={{ color: '#8c8c8c', fontSize: '14px' }}>Loading content...</p>
      </div>
    )
  }

  const sections = contentData ? Object.entries(contentData) : []

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f6f3ee',
      fontFamily: 'var(--font-body)',
      padding: '0 0 60px',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 400,
            color: '#f6f3ee',
            margin: 0,
          }}>
            FACES STUDIO <span style={{ color: '#ff5757' }}>CMS</span>
          </h1>
          <p style={{
            fontSize: '11px',
            color: 'rgba(246,243,238,0.5)',
            margin: '4px 0 0',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Content Manager — {sections.length} sections
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {saveMsg && (
            <span style={{
              fontSize: '12px',
              color: saveMsg.includes('Error') ? '#ff5757' : '#2d7d46',
              fontWeight: 500,
            }}>
              {saveMsg}
            </span>
          )}
          <button onClick={() => setShowNewForm(!showNewForm)} style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #ff5757',
            backgroundColor: '#ff5757',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            + New Entry
          </button>
          <a href="/#/" style={{
            fontSize: '12px',
            color: 'rgba(246,243,238,0.6)',
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid rgba(246,243,238,0.2)',
            borderRadius: '20px',
          }}>
            View Site
          </a>
          <button onClick={logout} style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(246,243,238,0.2)',
            backgroundColor: 'transparent',
            color: 'rgba(246,243,238,0.6)',
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* New Entry Form */}
      {showNewForm && (
        <div style={{
          backgroundColor: '#fff',
          margin: '20px 40px',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#1a1a1a' }}>New Content Entry</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <input placeholder="Section Key (e.g. hero)" value={newEntry.sectionKey} onChange={(e) => setNewEntry({ ...newEntry, sectionKey: e.target.value })} style={inputStyle} />
            <input placeholder="Field Key (e.g. title)" value={newEntry.fieldKey} onChange={(e) => setNewEntry({ ...newEntry, fieldKey: e.target.value })} style={inputStyle} />
            <input placeholder="Order (e.g. 01)" value={newEntry.orderNum} onChange={(e) => setNewEntry({ ...newEntry, orderNum: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <textarea placeholder="German text" value={newEntry.valueDe} onChange={(e) => setNewEntry({ ...newEntry, valueDe: e.target.value })} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} />
            <textarea placeholder="English text" value={newEntry.valueEn} onChange={(e) => setNewEntry({ ...newEntry, valueEn: e.target.value })} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowNewForm(false)} style={{ ...btnStyle, backgroundColor: 'transparent', color: '#8c8c8c', border: '1px solid #e5e5e5' }}>Cancel</button>
            <button
              onClick={() => {
                if (!newEntry.sectionKey || !newEntry.fieldKey) return
                createMutation.mutate(newEntry)
              }}
              style={{ ...btnStyle, backgroundColor: '#ff5757', color: '#fff', border: 'none' }}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px' }}>
        {sections.map(([sectionKey, fields]) => (
          <div
            key={sectionKey}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              marginBottom: '16px',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            {/* Section Header */}
            <div style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(255,87,87,0.06)',
              borderBottom: '1px solid rgba(255,87,87,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 600,
                color: '#1a1a1a',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {sectionLabels[sectionKey] || sectionKey}
              </h2>
              <span style={{
                fontSize: '11px',
                color: '#8c8c8c',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(0,0,0,0.04)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}>
                {fields.length} fields
              </span>
            </div>

            {/* Fields */}
            <div style={{ padding: '8px' }}>
              {fields.map((field: any) => (
                <div
                  key={field.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    backgroundColor: '#fff',
                  }}
                >
                  {editingId === field.id ? (
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#ff5757',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>
                          {field.fieldKey}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleSave(field.id)} disabled={updateMutation.isPending} style={{
                            ...btnStyle, backgroundColor: '#2d7d46', color: '#fff', border: 'none', fontSize: '11px', padding: '6px 14px',
                          }}>
                            {updateMutation.isPending ? 'Saving...' : 'Save'}
                          </button>
                          <button onClick={() => setEditingId(null)} style={{
                            ...btnStyle, backgroundColor: 'transparent', color: '#8c8c8c', border: '1px solid #e5e5e5', fontSize: '11px', padding: '6px 14px',
                          }}>
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                        <div>
                          <label style={labelStyle}>German</label>
                          <textarea value={editValues.valueDe} onChange={(e) => setEditValues({ ...editValues, valueDe: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
                        </div>
                        <div>
                          <label style={labelStyle}>English</label>
                          <textarea value={editValues.valueEn} onChange={(e) => setEditValues({ ...editValues, valueEn: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Image URL (optional)</label>
                        <input type="text" value={editValues.imageUrl} onChange={(e) => setEditValues({ ...editValues, imageUrl: e.target.value })} placeholder="e.g. /images/photo.jpg" style={inputStyle} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ cursor: 'pointer' }} onClick={() => startEdit(field)}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#ff5757',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            display: 'block',
                            marginBottom: '6px',
                          }}>
                            {field.fieldKey}
                          </span>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                          }}>
                            <div>
                              <span style={{ fontSize: '10px', color: '#bbb', textTransform: 'uppercase' }}>DE</span>
                              <p style={{
                                margin: '2px 0 0',
                                fontSize: '13px',
                                color: '#1a1a1a',
                                lineHeight: 1.5,
                                whiteSpace: 'pre-wrap',
                              }}>
                                {field.valueDe || <em style={{ color: '#ccc' }}>(empty)</em>}
                              </p>
                            </div>
                            <div>
                              <span style={{ fontSize: '10px', color: '#bbb', textTransform: 'uppercase' }}>EN</span>
                              <p style={{
                                margin: '2px 0 0',
                                fontSize: '13px',
                                color: '#1a1a1a',
                                lineHeight: 1.5,
                                whiteSpace: 'pre-wrap',
                              }}>
                                {field.valueEn || <em style={{ color: '#ccc' }}>(empty)</em>}
                              </p>
                            </div>
                          </div>
                          {field.imageUrl && (
                            <p style={{
                              margin: '6px 0 0',
                              fontSize: '11px',
                              color: '#8c8c8c',
                              fontFamily: 'monospace',
                            }}>
                              {field.imageUrl}
                            </p>
                          )}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); startEdit(field) }} style={{
                          ...btnStyle, backgroundColor: 'transparent', color: '#8c8c8c', border: '1px solid #e5e5e5', fontSize: '11px', padding: '4px 10px', marginLeft: '12px', flexShrink: 0,
                        }}>
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Shared styles
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1.5px solid #e5e5e5',
  fontSize: '13px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
  color: '#1a1a1a',
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  fontWeight: 500,
  transition: 'all 0.3s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  color: '#8c8c8c',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}
