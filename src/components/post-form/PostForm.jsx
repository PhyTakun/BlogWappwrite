import React, { useCallback, useEffect } from 'react'
import {useForm} from 'react-hook-form' // toolkit to create form and handle em
import  service  from '../../appwrite/configuration'
import {useSelector} from 'react-redux'
import {Button, RTE,Input,Select} from '../index'
import {useNavigate} from 'react-router-dom'

function PostForm({post}) {
// post is a content already there
// data is what is passed when form is submitted
  const {register,handleSubmit,watch,setValue,getValues,control} = useForm({

    defaultValues : {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    }

  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("userDATA", userData);
  

  const submit = async (data) => 
    {
       console.log("userDATA", userData);
      if (post)
        {
           const file = await data.image[0] ? await service.uploadFile(data.image[0])  : null;  

           console.log(file);
           

           if(file)
            {
              await service.deleteFile(post.featuredImage); // file is uploaded, remove the old file (picture)
            }

          const dbPost = await service.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined
          })

          if(dbPost)
            {
              navigate(`/post/${dbPost.$id}`)  // after post submitted, navigate to the post page
            }

        }

      else 
      {
        console.log("file being uploaded:", data.image[0], data.image[0] instanceof File);
        const file = await service.uploadFile(data.image[0]); 
        console.log('file uploaded', file);
        

        if (file)
          {
            data.featuredImage = file.$id
            console.log(data);
            
            const dbPost = await service.createPost({
              ...data,
              userId: userData.$id // current logged in user id
            })
   
          if(dbPost)
            {
              navigate(`/post/${dbPost.$id}`)
            }
          }
      }
    }

    const slugTransform = useCallback((value) => {

      if(value && typeof value === "string")
      {
        return value
               .trim()
               .toLowerCase()
               .replace(/[^a-zA-Z\d\s]+/g, '-')
               .replace(/\s/g, "-");
      }

      return "";

    }, [])

    useEffect(() => {

      const subscription = watch((value, {name}) => {
        if(name == 'title')
          {
            setValue('slug', slugTransform(value.title) , {shouldValidate: true})
          }
      })

      return () => subscription.unsubscribe(); // remove from the memory, when the page changes or comp. unmounts 

    } , [slugTransform, watch, setValue]);

    const onError = (errors) => {
  console.log("VALIDATION ERRORS:", errors);
};

    
  return (
    <form onSubmit={handleSubmit(submit, onError)} className='flex flex-wrap '>
      <div className='w-2/3 px-2 text-black'>
          <Input 
          label = 'Title: '
          placeholder= 'Title'
           classname= 'mb-4 border-2'
          {...register('title', {required:true})}
          />

        <Input
        label = 'Slug: '
        placeholder = 'Slug'
        classname='mb-4 border-2'
        {...register('slug', {required: true})}
        onInput = {(e) => {
          setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate: true }) // when change is made on the input field
                                                                                          // of slug, to handle that scenario 
                                                                                            
        }}
        />
        
        <RTE 
        name ="content"
        label= "Content :"
        control={control}
        defaultValue={getValues("content")}

        />

      </div>

      <div className='w-1/3 px-2 text-black'>

        <Input
        label= "Featured Image: "
        type = "file"
        accept = "image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", {required:!post})} 
        />

        {post  && (
          <div className='w-full mb-4'>
            <img 
             src= {service.thumbnailPreview(post.featuredImage)}
             alt= {post.title}
             className='rounded-lg'
             />
          </div>
        )}

        <Select
        options={["active", "inactive"]}
        label = "Status"
        {...register("status", {required:true})}
        className="mb-4"
        />

        <Button
        type='submit'
        bgColor={post ? "bg-green-500" : undefined }>
          {post ? "Update" : "Submit"}
        </Button>

      </div>

    </form>
  )}

export default PostForm