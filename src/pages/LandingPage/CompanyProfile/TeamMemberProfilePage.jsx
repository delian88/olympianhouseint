import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { allMembers } from "../../../data/teamData";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import heroImage from "../../../assets/images/profile-hero-mountain.jpg";

const TeamMemberProfilePage = () => {
  const { slug } = useParams();
  
  // Find the team member by slug
  const member = allMembers.find((m) => m.slug === slug);

  if (!member) {
    return <Navigate to="/our-team" replace />;
  }

  return (
    <ProfilePageShell
      title={member.name}
      heroImage={heroImage}
      heroImageAlt={member.name}
      description={`Meet ${member.name}, our ${member.title}.`}
      descriptionClassName="text-white"
      primaryCta={{ label: "Contact Us", href: "/contact" }}
      secondaryCta={{ label: "Back to Team", href: "/our-team" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Team Profile
          </p>
        </div>
      }
    >
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg3.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 md:flex-row md:items-start">
            {/* Member Image */}
            <div className="w-64 shrink-0">
              <div className="overflow-hidden shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Member Details */}
            <div className="flex-1 text-center md:text-left">
              <SectionHeader
                title={member.name}
                description={member.title}
                className="max-w-2xl !text-left"
              />
              
              <div className="mt-8 space-y-6 text-[#4e5a67]">
                <p>
                  This is a placeholder for <strong>{member.name}</strong>'s biography. The team member currently serves as the <strong>{member.title}</strong> at Olympian House International (OHI).
                </p>
                <p>
                  With extensive experience and dedication, {member.name.split(" ")[0]} brings valuable insights to our team and helps drive our mission forward. They are committed to ensuring our production, communications, and operational leadership meet the highest standards.
                </p>
                <p>
                  <em>Note: Please update the member's biography in the future to include specific details about their background, achievements, and responsibilities.</em>
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/our-team"
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.12em] text-[#F07F1A] hover:text-[#2e3135]"
                >
                  &larr; Back to Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default TeamMemberProfilePage;
