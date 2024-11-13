const Header = () => {
  return (
    <section>
      <div className=" flex flex-col gap-2">
        <div className=" p-3">
          <img
            src="/IMGs/header.gif"
            alt="header"
            className=" w-full md:h-[250px] rounded-xl  object-cover"
          />
        </div>
        <div className=" flex flex-col gap-3 justify-center items-center px-3">
          <h1 className=" md:text-6xl text-4xl font-bricolage font-semibold text-neon text-center ">
            Brain-Rot Language Converter
          </h1>
          <p className=" text font-popins text-center text-zinc-300">
            Turn your text into trendy Gen Z slang with a click. Add memes,
            slang, and cool vibes instantly!👀 Stay on top of the latest trends
            and speak like a pro! 💯
          </p>
        </div>
      </div>
    </section>
  )
}

export default Header
