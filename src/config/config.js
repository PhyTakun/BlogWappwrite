const config = {

    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL), 
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableName : String(import.meta.env.VITE_APPWRITE_TABLES_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    editorApikey: String(import.meta.env.VITE_EDITOR_API_KEY)

}

export default config // enforcing data types and helps in easily finding errors (dk how)