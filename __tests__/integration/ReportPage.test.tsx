import { render, screen, waitFor } from '@testing-library/react'
import ReportsPage from '@/app/admin/reports/page'

test('renderiza reportes por categoría', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    success: true,
                    data: [
                        { category: 'Tecnología', active: 5, inactive: 1 }
                    ]
                })
        })
    ) as jest.Mock

    render(<ReportsPage />)

    await waitFor(() => {
        expect(screen.getByText('Tecnología')).toBeInTheDocument()

        expect(screen.getAllByText('5').length).toBeGreaterThan(0)

        expect(screen.getAllByText('1').length).toBeGreaterThan(0)
    })
})
