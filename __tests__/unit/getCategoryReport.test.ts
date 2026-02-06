import { getCategoryReport } from '@/services/ReportService'

test('obtiene reportes por categoría', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve([
                    { category: 'Tecnología', available: 5, inactive: 2 }
                ])
        })
    ) as jest.Mock

    const data = await getCategoryReport()

    expect(data).toHaveLength(1)
    expect(data[0].category).toBe('Tecnología')
})
