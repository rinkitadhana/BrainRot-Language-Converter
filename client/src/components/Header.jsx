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
        <div className=" flex justify-center px-3">
          <h1 className=" md:text-6xl text-4xl font-bricolage font-semibold text-neon ">
            Brain-Rot <span className="text-pur">Language</span> Converter
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Header
