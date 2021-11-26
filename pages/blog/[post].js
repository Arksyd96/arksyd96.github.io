import React from 'react'
import { useRouter } from 'next/router'


const Post = () => {
    const router = useRouter()
    const { post } = router.query
    
    return <h1>Post ${post}</h1>
}

export default Post;