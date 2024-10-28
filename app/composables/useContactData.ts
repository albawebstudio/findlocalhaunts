import { ref } from 'vue'
import type { Contact } from '~/models/contact'

export function useContactData() {
    const contact = ref<Contact>({
        title: "Contact us",
        content: [
            "Whether you’ve spotted a haunting bug, have feedback on a feature, or just want to share an idea to make our site even better—we'd love to hear from you! Drop us a message."
        ]
    })

    return {
        contact
    }
}
