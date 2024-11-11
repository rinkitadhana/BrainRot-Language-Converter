const Header = () => {
  return (
    <section>
      <div className=" flex flex-col gap-4">
        <div>
          <img
            src="/IMGs/header.gif"
            alt="header"
            className=" w-full h-[250px] rounded-xl object-cover"
          />
        </div>
        <div className=" mx-auto">
          <h1 className=" text-6xl font-bricolage font-semibold text-neon ">
            Brain-Rot <span className="text-pur">Language</span> Converter
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Header
