import { FaXTwitter } from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className=" py-6">
      <div className=" flex flex-col items-center gap-3">
        <div className=" flex flex-col justify-center items-center  font-semibold">
          <h1>Thanks for visiting!</h1>
          <h1>
            <span className=" text-neon">Gruz & Arnab</span> made this
          </h1>
        </div>

        <a
          href="https://x.com/damnGruz"
          target="_blank"
          className=" flex gap-1.5 w-fit items-center border font-semibold rounded-full px-3 py-1 hover:bg-white hover:text-black transition-all"
        >
          <FaXTwitter /> Follow Me
        </a>
      </div>
    </footer>
  )
}

export default Footer
