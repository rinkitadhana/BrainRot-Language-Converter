const Header = () => {
  return (
    <section>
      <div className=" flex flex-col gap-4">
        <div className=" p-3">
          <img
            src="/IMGs/header.gif"
            alt="header"
            className=" w-full md:h-[250px] rounded-xl  object-cover"
          />
        </div>
        <div className=" flex flex-col gap-3 justify-center items-center px-3">
          <h1 className=" md:text-6xl text-4xl font-bricolage font-semibold text-neon ">
            Brain-Rot <span className="text-pur">Language</span> Converter
          </h1>
          <p className=" text-lg font-popins text-center text-neon">
            Turn your text into trendy Gen Z slang with a click. Add memes,
            slang, and cool vibes instantly!👀
          </p>
        </div>
      </div>
    </section>
  )
}

export default Header
