import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import supabase from '@/lib/supabase'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback
})

function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate({ to: '/' })
      } else {
        navigate({ to: '/auth' })
      }
    })
  }, [navigate])

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-base)'
    }}>
      <p style={{ 
        fontFamily: 'var(--font-body)', 
        color: 'var(--text-muted)',
        fontStyle: 'italic'
      }}>
        Entering the experience...
      </p>
    </div>
  )
}
