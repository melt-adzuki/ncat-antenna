interface NotifierData {
    title: string
    text: string
}

type Notifier = (data: NotifierData) => void
