import ContactSection from "@/app/(marketing)/_components/sections/Contact";
import HeroSection from "@/app/(marketing)/_components/sections/Hero";
import PostsSection from "@/app/(marketing)/_components/sections/Posts";
import ProjectsSection from "@/app/(marketing)/_components/sections/Projects";
import TechStackSection from "@/app/(marketing)/_components/sections/TechStack";
import ThoughtsSection from "@/app/(marketing)/_components/sections/Thoughts";

export default function LandingPage() {

    return (
        <>
            <HeroSection />
            <ProjectsSection />
            <PostsSection />
            <ThoughtsSection />
            <TechStackSection />
            <ContactSection />
        </>
    );
}