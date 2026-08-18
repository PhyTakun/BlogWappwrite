import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../config/config'

function RTE({
    name,
    control,
    label,
    defaultValue = ''
}) {
    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1.5 pl-0.5 text-sm font-medium text-slate-600'>
                    {label}
                </label>
            )}
            <div className='rounded-md border border-slate-200 overflow-hidden'>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey= {config.editorApikey}
                            initialValue={defaultValue}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style: "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size:14px; color:#0f172a; }",
                                skin: "oxide",
                                content_css: "default",
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default RTE