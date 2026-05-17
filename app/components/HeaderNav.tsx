"use client";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "quick-actions", label: "Quick actions" },
  { id: "add-user", label: "Add user" },
  { id: "user-list", label: "User list" },
];

function scrollToSection(id: string) {
  const element = document.getElementById(id);

  element?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function HeaderNav() {
  return (
    <nav className="header-actions" aria-label="Dashboard navigation">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className="header-action-btn"
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
