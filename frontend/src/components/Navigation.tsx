import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Navigation() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '20px' : '20px 40px',
      maxWidth: 1200,
      margin: '0 auto',
      borderBottom: '1px solid #e5e5e5',
    }}>
      <Link 
        to="/" 
        style={{ 
          fontSize: isMobile ? '24px' : '28px', 
          fontWeight: 700, 
          color: '#333', 
          textDecoration: 'none',
          letterSpacing: '-0.5px',
        }}
      >
        GRAND <span style={{ fontWeight: 400 }}>BLOG</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '20px' : '30px' }}>
        <Link 
          to="/" 
          style={{ 
            color: '#333', 
            textDecoration: 'none', 
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Home
        </Link>
        <a 
          href="/canvas" 
          style={{ 
            color: '#333', 
            textDecoration: 'none', 
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Admin
        </a>
      </div>
    </nav>
  )
}

