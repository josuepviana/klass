import Sidenav from "../components/menu/sidenav";
import RightNav from "../components/rightnav";

import './ContentLayout.css'

function ContentLayout({ children }) {
  return (
    <div className="content-layout">
      <Sidenav />
      <section>
        {children}
      </section>
      <aside>
        <RightNav />
      </aside>
    </div>
  )
} 

export default ContentLayout;