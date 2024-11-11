const Content = () => {
  return (
    <section className=" flex flex-col gap-5 my-6  ">
      <div className=" flex justify-center">
        <textarea
          class=" bg-zinc-800 h-[200px] w-full border-2 border-pur  rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-neon resize-y"
          placeholder="Enter text here..."
        ></textarea>
      </div>
      <div className=" flex justify-center">
        <button className=" text-neon text-lg font-semibold border-2 py-2 px-3 rounded-full border-pur hover:bg-pur transition-all  ">
          Generate
        </button>
      </div>
    </section>
  )
}

export default Content
