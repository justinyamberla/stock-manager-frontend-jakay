import { getCategoryMetrics } from '@/services/ReportService'

test('obtiene métricas por categoría', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    available: 10,
                    inactive: 3
                })
        })
    ) as jest.Mock

    const res = await getCategoryMetrics('Tecnología')

    expect(res.available).toBe(10)
    expect(res.inactive).toBe(3)
})
