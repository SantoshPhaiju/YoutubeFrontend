import Link from 'next/link'
import React from 'react'

const SidebarItem = ({ icon, name, link }: {
    icon: React.ReactNode;
    name: string;
    link: string;
}) => {
  return (
    <Link href={link} className='flex w-[100%] items-center gap-6 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer'>
      <div className="icon text-xl">
        {icon}
      </div>
      <div className='text-lg'>
        {name}
      </div>
    </Link>
  )
}

export default SidebarItem
