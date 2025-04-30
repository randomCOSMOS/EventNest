export default function Footer() {
    return (
      <footer className="w-full mt-16 py-6 border-t border-neutral-800 bg-neutral-900 text-center text-sm text-neutral-400">
        <div>
          &copy; {new Date().getFullYear()} EventNest. All rights reserved.<br />
          Developed by Srijan as part of an internship project for EazyBytes.
        </div>
        <div className="mt-2">
          Contact: <a href="mailto:srijanwhat2@gmail.com" className="text-neutral-200 hover:underline">srijanwhat2@gmail.com</a> &nbsp;|&nbsp;
          GitHub: <a href="https://github.com/randomCOSMOS" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:underline">randomCOSMOS</a>
        </div>
      </footer>
    );
  }
  