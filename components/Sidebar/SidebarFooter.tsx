import React, {memo} from 'react'
import { footerList1, footerList2, footerList3 } from '../../utils/constants';



const FooterList = ({items, mt=false}: { items: string[], mt?: boolean}) => (
  <div className="flex flex-wrap gap-2 mt-5"
    style={{
      marginTop: mt ? '1.25rem' : '0px',
    }}
  >
        {
          items.map((item, index) => (
            <p key={`side_bar_footer_${item}_${index}`}
              className="text-gray-400 text-sm hover:underline cursor-pointer"
            >
              {item}
            </p>
          ))
        }
  </div>
)

const SidebarFooter = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <FooterList items={footerList1} />
      <FooterList items={footerList2} mt/>
      <FooterList items={footerList3} mt/>
      <p className="text-gray-400 text-sm mt-5">2022 TikTak</p>
    </div>
  )
}

export default memo(SidebarFooter);