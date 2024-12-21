'use client'

import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { groupRecordsByDate } from '@/entities/record/lib'
import { Record } from '@/entities/record/model/types'
import { fetchRecords } from '@/shared/lib/requests'
import { Button } from '@/shared/ui/common/button'
import {
  Sidebar as CNSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/common/sidebar'
import { PanelLeft } from 'lucide-react'

export function Sidebar() {
  const [records, setRecords] = useState<Record[]>([])
  const { setOpen } = useSidebar()

  useEffect(() => {
    ;(async () => {
      try {
        const records = await fetchRecords()
        setRecords(records)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <CNSidebar>
      <SidebarHeader className='flex-row gap-8'>
        <Button
          className='-mt-[2px] ml-[6px]'
          variant='ghost'
          size='icon'
          onClick={() => setOpen(false)}
        >
          <PanelLeft className='scale-150' />
        </Button>
        <Link href='/'>
          <Image
            src='/logo.png'
            className='brightness-0 filter'
            alt='Lexify logo'
            width={100}
            height={64}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        {records.length && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupRecordsByDate(records).map(
                  (group, index) =>
                    group.items.length > 0 && (
                      <div key={index}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        {group.items.map(item => (
                          <Fragment key={item.id}>
                            <SidebarMenuItem className='max-w-full overflow-hidden text-ellipsis whitespace-pre'>
                              <Button variant='ghost' size='sm'>
                                {item.content}
                              </Button>
                            </SidebarMenuItem>
                          </Fragment>
                        ))}
                      </div>
                    ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter />
    </CNSidebar>
  )
}
