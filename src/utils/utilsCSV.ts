import parse from 'csv-parse';

function generateParser() {
    try {
        const parser = parse({
            columns: true,
            from_line: 1,
            delimiter: ';',
            bom: true
        });
        return parser
    } catch (error) {
        console.log(error)
    }
}

export async function formatCSVToObject(file: any) {
    try {
        const bufferFile = file.buffer.toString("utf-8")

        const parserInputFile = generateParser() as any
        parserInputFile.write(bufferFile)
        parserInputFile.end()

        const result = []

        for await (const record of parserInputFile) {
            result.push(record)
        }

        return result

    } catch (error) {
        console.log(error)
    }
}
