interface Note {
    id: string
    createdAt: string
    userId: string
    user: User
    text?: string
    cw?: string
    visibility: "public" | "home" | "followers" | "specified"
    renoteCount: number
    repliesCount: number
    reactions: Record<string, number>
    emojis: Emoji[]
    fileIds: string[]
    files: File[]
    replyId?: string
    renoteId?: string
    renote?: Note
    mentions?: string[]
    uri?: string
    reply?: Note
    myReaction: string
}

interface User {
    id: string
    name: string
    username: string
    host?: string
    avatarUrl: string
    avatarBlurhash: string
    avatarColor: string
    isCat: boolean
    instance: Instance
    emojis: Emoji[]
    onlineStatus: "online" | "active" | "offline" | "unknown"
}

interface Instance {
    name: string
    softwareName: string
    softwareVersion: string
    iconUrl?: string
    faviconUrl?: string
    themeColor?: string
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
    blurhash?: string
    properties: {
        width: number
        height: number
    }
    url: string
    thumbnailUrl: string
    comment?: unknown // FIXME
    folderId?: string
    folder?: unknown // FIXME
    userId?: string
    user?: User
}
