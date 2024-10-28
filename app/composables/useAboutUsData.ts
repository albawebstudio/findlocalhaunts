import { ref } from 'vue'

import type { About, Mission } from '~/models/about'

export function useAboutUsData() {
    const missionItems = ref<Mission[]>([
        {
            title: "Accessibility",
            content: "Simple, intuitive search features that connect visitors to haunts"
        },
        {
            title: "Trust",
            content: "Verified venues and authentic information"
        },
        {
            title: "Community",
            content: "Supporting local entertainment venues and thrill-seeking visitors"
        },
        {
            title: "Innovation",
            content: "Modern design with user experience at the forefront"
        }
    ])

    const about = ref<About>({
        title: "About Us",
        content: [
            "Find Local Haunts connects thrill-seekers with verified haunted attractions in their area, making it easy to discover and experience local scares. We bring together haunted entertainment venues and adventure-seeking visitors through a user-friendly platform that emphasizes safety, authenticity, and community engagement. Our commitment to verification ensures that every listed attraction meets our standards, while our location-based search helps visitors find their perfect haunted experience just around the corner."
            ],
        mission: missionItems.value
    })

    return {
        about
    }
}
