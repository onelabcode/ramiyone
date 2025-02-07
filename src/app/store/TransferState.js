import { create } from 'zustand';
import { toast } from 'sonner';
import { axiosB } from '../libaxios/axios';

export const useTransferNewStore = create((set) => ({
  transfers: [],
  singleTransfer: null,
  loading: false,
  error: null,

  fetchTransfers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get('/api/transfer');
      set({ transfers: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching transfers:', error);
      set({ error: 'Failed to fetch transfers', loading: false });
    }
  },

  
  fetchTransferById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/transfer/each/${id}`);
      set({ singleTransfer: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching transfer:', error);
      set({ error: 'Failed to fetch transfer', loading: false });
    }
  },


  createTransfer: async (transferData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post('/api/transfer', transferData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set((state) => ({ transfers: [response.data.news, ...state.transfers], loading: false }));
      toast.success('Transfer created successfully');
    } catch (error) {
      console.error('Error creating transfer:', error);
      set({ error: 'Failed to create transfer', loading: false });
    }
  },


  updateTransfer: async (id, updatedData) => {
    console.log(id,updatedData);
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/transfer/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axiosB.get(`/api/transfer/${id}`);

      set((state) => ({
        transfers: state.transfers.map((transfer) =>
          transfer.id === id ? response.data : transfer
        ),
        loading: false,
      }));

      toast.success('Transfer updated successfully');
    } catch (error) {
      console.error('Error updating transfer:', error);
      set({ error: 'Failed to update transfer', loading: false });
    }
  },


  deleteTransfer: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/transfer/${id}`);
      set((state) => ({
        transfers: state.transfers.filter((transfer) => transfer.id !== id),
        loading: false,
      }));
      toast.success('Transfer deleted successfully');
    } catch (error) {
      console.error('Error deleting transfer:', error);
      set({ error: 'Failed to delete transfer', loading: false });
    }
  },
}));
