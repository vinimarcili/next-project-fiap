const Footer = () => {
  return (
    <footer className="text-center p-2 bg-black text-white text-sm w-full">
      Desenvolvido por
      <a
        href="https://github.com/vinimarcili"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:underline ml-1"
      >
        Vinícius Marcili
      </a>
      {' '}@ {new Date().getFullYear()}
    </footer>
  )
}

export default Footer