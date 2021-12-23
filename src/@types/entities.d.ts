interface Note {
    id: string
    createdAt: string
    userId: string
    user: User
    text: string | null
    cw: string | null
    visibility: "public" | "home" | "followers" | "specified"
    renoteCount: number
    repliesCount: number
    reactions: Record<string, number>
    emojis: Emoji[]
    fileIds: string[]
    files: File[]
    replyId: string | null
    renoteId: string | null
    renote?: Note
    mentions?: string[]
    uri?: string
    reply?: Note
    myReaction?: string
}

interface User {
    id: string
    name: string
    username: string
    host: string | null
    avatarUrl: string
    avatarBlurhash: string
    avatarColor: string | null
    isCat: boolean
    instance: Instance
    emojis: Emoji[]
    onlineStatus: "online" | "active" | "offline" | "unknown"
}

interface Instance {
    name: string
    softwareName: string
    softwareVersion: string
    iconUrl: string
    faviconUrl: string
    themeColor: string
}

interface Emoji {
    name: string
    url: string
}

interface File {
    id: string
    createdAt: string
    name: string
    type: string
    md5: string
    size: number
    isSensitive: boolean
    blurhash: string
    properties: {
        width: number
        height: number
    }
    url: string
    thumbnailUrl: string
    comment: unknown | null // FIXME
    folderId: string | null
    folder: unknown | null // FIXME
    userId: string | null
    user: User | null
}
