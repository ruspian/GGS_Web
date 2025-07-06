import { Avatar, User } from '@heroui/react'
import React from 'react'
import { LiaComment } from 'react-icons/lia'
import 'dayjs/locale/id';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('id');
dayjs.extend(relativeTime);

const KomentarComponent = ({ comment }) => {
  console.log("comment", comment);

  return (
    <section className='pb-4'>
      <div className='flex gap-2'>
        <LiaComment size="20" />
        <p>Komentar</p>
      </div>

      {
        comment.length > 0 ? (
          comment.map((item, index) => (

            <div key={`comment-${index + 1}`} className="flex my-4 items-start gap-2.5">
              <Avatar src={item.userId.avatar} />

              <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.userId.name}</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  {item.comment}
                </p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{dayjs(item?.date).fromNow()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-muted-foreground'>Belum ada komentar</p>
        )
      }

    </section>
  )
}

export default KomentarComponent
