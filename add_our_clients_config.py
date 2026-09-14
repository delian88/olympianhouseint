import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\data\landingPageDefaults.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

our_clients_block = """  ourClientsPage: {
    hero: {
      title: "Our Clients",
      description: "Institutional clients, partners, and multilateral agencies that trust Olympian House International.",
      primaryCtaLabel: "Contact Us",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Our Team",
      secondaryCtaHref: "/our-team",
      badgeEyebrow: "OHI profile",
      badgeDescription: "Strategic visibility for development, investment, and impact communication.",
    },
    whoWeServe: {
      title: "Who we serve",
      description: "A 95% repeat-client rate, built on trust earned across nearly a decade of institutional work.",
      sectorsTitle: "Sectors we serve",
      sectorsSubtitle: "Partners at the intersection of impact, investment, and communication.",
      sectorsDescription: "OHI works with institutions that need credible, human-centred visual narratives to demonstrate impact, attract financing, and strengthen stakeholder trust.",
      sectorsHighlights: [
        "Development Finance Institutions",
        "Multilateral & UN Agencies",
        "Bilateral Development Institutions",
        "Governments & Implementing Partners",
        "Foundations",
        "Private-Sector ESG & Social-Impact Programmes",
      ],
      darkBlockTitle: "Great storytelling for development",
      darkBlockSubtitle: "The difference between a programme that is completed and one that is seen, trusted, and funded again.",
      darkBlockDescription: "It is not about beauty alone. It is about credibility, evidence, and impact at scale.",
    },
    clients: {
      title: "Our clients",
      subtitle: "Trusted by leading institutions across Africa and beyond",
      items: [
        "Sun King", "Olam", "Olam Food Ingredients (OFI)", "IFRC", "CRTV",
        "Les Laboratoires Biopharma", "EU Civil Protection & Humanitarian Aid", "HOFNA",
        "#defyhatenow", "African Wildlife Foundation", "World Food Programme", "CORAF",
        "Cosmos Educational Press", "International Rescue Committee", "AfriYAN",
        "Cameroon Investment Promotion Agency (API)",
      ]
    }
  },
"""

target = "  whoWeServePage: {"
if target in content and "ourClientsPage: {" not in content:
    content = content.replace(target, our_clients_block + target)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("ourClientsPage config added to defaults.")
else:
    print("Target not found or already added.")
