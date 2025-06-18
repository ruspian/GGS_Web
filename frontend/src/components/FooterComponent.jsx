import React from 'react'

const FooterComponent = () => {
  return (
    <footer>
      <div className="border-t container-lg lg:px-20">
        <div className="flex flex-col items-center justify-between gap-3 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Gorontalo green School. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Tumbuh Bersama Generasi Lestari</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
