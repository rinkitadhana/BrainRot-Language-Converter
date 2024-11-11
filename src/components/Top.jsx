import { FaGithub } from "react-icons/fa"

const Top = () => {
  return (
    <section className=" absolute top-3 right-3">
      <a
        href=""
        className=" flex gap-1.5 font-medium items-center justify-center border-2 rounded-full py-1.5 px-3 cursor-pointer hover:bg-white hover:text-black transition-all w-fit backdrop-blur-sm bg-black/40"
      >
        <FaGithub />
        Github
      </a>
    </section>
  )
}

export default Top
