import React, {useEffect, useState} from 'react'
import { Container, Postcard } from '../components'
import service from '../appwrite/configuration';
import { useNavigate } from 'react-router-dom';

function AllPost() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([])

    useEffect(() => {

        service.getPosts()
        .then((posts) => {
            if(posts)
                {
                    setPosts(posts.documents)
                    console.log("post object in all post", posts.documents);
                    
                }

        } )

    }, 
    [])


  
   return  posts ? (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
 : <div className='text-2xl text-red-600'> No Posts</div>
}

export default AllPost