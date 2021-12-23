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
    files: MisskeyFile[]
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
    name: string | null
    username: string
    host: string | null
    avatarUrl: string
    avatarBlurhash: string | null
    avatarColor: string | null
    isCat?: boolean
    instance?: Instance
    emojis: Emoji[]
    onlineStatus: "online" | "active" | "offline" | "unknown"
}

interface Instance {
    name: string | null
    softwareName: string | null
    softwareVersion: string | null
    iconUrl: string | null
    faviconUrl: string | null
    themeColor: string | null
}

interface Emoji {
    name: string
    url: string
}

interface MisskeyFile {
    id: string
    createdAt: string
    name: string
    type: string
    md5: string
    size: number
    isSensitive: boolean
    blurhash: string | null
    properties: {
        width?: number
        height?: number
    }
    url: string
    thumbnailUrl: string | null
    comment?: unknown | null // FIXME
    folderId: string | null
    folder?: unknown | null // FIXME
    userId: string | null
    user: User | null
}
