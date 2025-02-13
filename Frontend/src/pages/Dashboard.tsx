import {Button} from '../components/Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { ContentType, CreateContent } from '../components/CreateContent'
import { useEffect, useState } from 'react'
import { SideBar } from '../components/SideBar'
import axios from "axios"

import { BACKEND_URL } from '../config'
import { Card } from '../components/Card'
// import { useContent } from '../hooks/useContent'
interface Content{
  type: ContentType,
  title: string,
  link: string
}

export function Dashboard() {
const [modalOpen, setModalOpen] = useState(false)
const [content,setContents] = useState<Content[]>()
// const contents = useContent()
async function getContent(){
  const token = localStorage.getItem('token');
  console.log('Token being used:', token); // Debug log

  
  const response = await axios.get(`${BACKEND_URL}/api/v1/user/content`,{
      headers: { 
          "token": token             }
  })
  setContents(response.data)
  console.log(content)
}
useEffect(() => {
  getContent()

  
},[content])

  return <div >
    <SideBar></SideBar>
    <div className='p-4 ml-72 min-h-screen bg-gray-100'>
    <CreateContent open={modalOpen} onClose={() => {
      setModalOpen(false)
    }}></CreateContent>
      <div className='flex justify-end pt-2 px-4 '>
       <Button onClick={() => setModalOpen(true) } variant='primary' text='Add content' startIcon={<PlusIcon /> }></Button>
       <div className='px-2'>
       <Button  
  onClick={async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/brain/share`, {
      share: true,
    },{
      headers:{
        "token": localStorage.getItem('token')
      }
    });
    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
    console.log("Share URL:", shareUrl);

    // Clipboard functionality to copy the URL
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert("Share URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  }} 
  variant='secondary' 
  text='Share Brain' 
  startIcon={<ShareIcon />} 
></Button>
       </div>
      </div>
      <div className='flex pt-4 flex-wrap'>
    {content && content.map(({type, link, title}) => (
        <Card
         
            type={type} 
            link={link} 
            title={title} 
        />
    ))}
</div>


      </div>
      </div>
      
 
}

  