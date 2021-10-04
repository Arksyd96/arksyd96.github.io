import Link from 'next/link'
const blog =  () => (
  <div>
    <div>Blog still in construction</div>
    <div>Back to <Link href='/' as={ process.env.BACKEND_URL + '/'}><a>Home</a></Link></div>
  </div>
)

export default blog;