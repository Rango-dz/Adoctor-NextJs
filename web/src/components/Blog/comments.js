import Image from 'next/image'
import Date from '../../../lib/date'

export default function Comments(comments) {

  return (
    <>
      <div>
        {comments.comment?.map(({ _id, _createdAt, name, email, comment }) => (

          <div key={_id} className="w-full flex gap-5 overflow-hidden justify-start">
            <div className='flex justify-center align-middle p-10 pr-0'>
              <div className='block self-center w-auto min-w-max'><Image src={`https://ui-avatars.com/api/?name=${name}&?background=random`} width={50} height={50} className="rounded" /></div>
            </div>
            <div className=' p-10 pl-0'>
              <h4 className="mb-2 leading-tight font-semibold"><a href={`mailto:${email}`}>{name}</a> <span className='text-grey-400 font-normal'>(<Date dateString={_createdAt} />)</span></h4>
              <div className="w-full">
                <p className='text-slate-500 p-10 bg-[#f5f6f7] w-full rounded-lg'>{comment}</p>
              </div>


            </div>


          </div>
        ))
        }
      </div>
    </>
  )
}