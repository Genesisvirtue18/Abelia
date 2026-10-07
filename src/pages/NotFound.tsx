import { Link } from "react-router-dom";
import { BroomMark } from "../components/Logo";
import { IconArrow } from "../components/Icons";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden pt-32">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-blush-soft blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-sage-soft blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <BroomMark className="mx-auto h-20 w-20 rotate-12 text-sage-deep" />
        <p className="mt-6 font-script text-7xl text-blush-deep">Ups…</p>
        <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">
          Denna sida har fått en rejäl städpass.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          Sidan du letar efter finns inte (längre) – men resten av hemmet är i glansande skick.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/" className="glass-btn-solid">
            Till startsidan <IconArrow className="h-4.5 w-4.5" />
          </Link>
          <Link to="/bokning" className="glass-btn">
            Boka en städning
          </Link>
        </div>
      </div>
    </div>
  );
}
