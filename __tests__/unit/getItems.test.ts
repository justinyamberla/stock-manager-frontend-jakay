import { fetchItems } from '@/services/ItemService'

describe('fetchItems', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('retorna items cuando la API responde correctamente', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        success: true,
                        data: [
                            { id: '1', name: 'Laptop', status: 'ACTIVE' }
                        ],
                        message: 'OK'
                    })
            })
        ) as jest.Mock

        const res = await fetchItems()

        expect(res.success).toBe(true)
        expect(res.data).toHaveLength(1)
        expect(res.data[0].name).toBe('Laptop')
    })

    test('retorna error cuando API responde success false', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () =>
                    Promise.resolve({
                        success: false,
                        data: null,
                        message: 'Error al cargar'
                    })
            })
        ) as jest.Mock

        const res = await fetchItems()

        expect(res.success).toBe(false)
        expect(res.message).toBe('Error al cargar')
    })

    test('maneja errores cuando fetch falla', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Network error'))
        ) as jest.Mock

        const res = await fetchItems()

        expect(res.success).toBe(false)
        expect(res.message).toBe('Network error')
    })

})
