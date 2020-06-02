class ValidationRequest {
    public data: string = null;
    public result: boolean = null;

    constructor(
        public readonly validationId: string,
        public readonly label: string
    ) {}
}

export default ValidationRequest;