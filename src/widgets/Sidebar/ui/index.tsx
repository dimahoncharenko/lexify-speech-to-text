'use client'

import { Fragment, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { groupRecordsByDate } from '@/entities/record/lib'
import { SidebarContext } from '@/shared/lib/trascription-context'
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
  const { setOpen } = useSidebar()
  const { setSelected, optimisticRecords } = useContext(SidebarContext)
  const path = usePathname()

  if (path !== '/') return null

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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        {optimisticRecords && optimisticRecords.length > 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupRecordsByDate(optimisticRecords).map(
                  (group, index) =>
                    group.items &&
                    group.items.length > 0 && (
                      <div key={index}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        {group.items.map(item => (
                          <Fragment key={item.id}>
                            <SidebarMenuItem className='max-w-full overflow-hidden text-ellipsis whitespace-pre'>
                              <Button
                                variant='ghost'
                                size='sm'
                                onClick={() => setSelected(item)}
                                title={item.file_name}
                              >
                                {item.file_name}
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
