import React, { useEffect, useState } from 'react'
import service from '../appwrite/configuration'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Container } from '../components'
import parse from 'html-react-parser'

function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    }
                    else navigate('/')
                })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    service.deleteFile(post.featuredImage);
                    navigate('/');
                }
            })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className='w-1/2 flex justify-center mb-6 relative border border-slate-200 rounded-xl p-2 bg-white'>
                    <img
                        src={service.thumbnailPreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg w-full max-h-[480px] object-cover"
                    />

                    {isAuthor && (
                        <div className='absolute right-4 top-4 flex gap-2'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor='bg-slate-900' classname='hover:bg-slate-800'>
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor='bg-red-600'
                                classname='hover:bg-red-700'
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-semibold text-slate-900'>
                        {post.title}
                    </h1>
                </div>

                <div className="browser-css text-slate-700 leading-relaxed">
                    {post.content ? parse(post.content) : <p className="text-slate-400 italic">No content</p>}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post