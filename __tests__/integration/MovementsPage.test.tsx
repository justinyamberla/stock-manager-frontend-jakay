import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import MovementsPage from '@/app/admin/history/page'

test('renderiza movimientos y permite filtrar', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    success: true,
                    data: [
                        {
                            id: '1',
                            type: 'ADD',
                            mode: 'BATCH',
                            targetIds: ['A1', 'A2'],
                            timestamp: '2024-01-01'
                        },
                        {
                            id: '2',
                            type: 'DEACTIVATE',
                            mode: 'SINGLE',
                            targetIds: ['B1'],
                            timestamp: '2024-01-02'
                        }
                    ]
                })
        })
    ) as jest.Mock

    render(<MovementsPage />)

    await waitFor(() => {
        expect(screen.getByText('Alta')).toBeInTheDocument()
        expect(screen.getByText('Baja')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'ADD' }
    })

    expect(screen.getByText('Alta')).toBeInTheDocument()
    expect(screen.queryByText('Baja')).not.toBeInTheDocument()
})
