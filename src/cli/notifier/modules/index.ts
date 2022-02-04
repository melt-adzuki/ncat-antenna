export default abstract class Module
{
	protected title: string
	protected text: string

	constructor(title: string, text: string)
	{
		this.title = title
		this.text = text
	}

    public abstract fire(): void
}
