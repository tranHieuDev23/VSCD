class ValidationRequest {
    public data: string = null;
    public validation: boolean = null;

    constructor(
        public readonly recordId: string,
        public readonly label: string
    ) {}
}

export default ValidationRequest;