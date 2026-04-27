import { LightningElement, api, track } from 'lwc';
export default class Modal extends LightningElement {
    @track isModalOpen = false;
    @api headerTitle = 'Modal Header'; // Default header title

    // Record passed from parent (simple object with fields)
    @api record = null;

    // Local editable copy of record fields
    @track editableRecord = {};

    // Watch for changes to the public record property and copy into editableRecord
    renderedCallback() {
        if (this.record && this.record.Id && this.editableRecord.Id !== this.record.Id) {
            // shallow copy fields so editing doesn't affect parent directly
            this.editableRecord = {
                Id: this.record.Id,
                Name: this.record.Name,
                Phone: this.record.Phone,
                Industry: this.record.Industry
            };
        }
    }

    // Open the modal and move focus to the heading for accessibility
    @api openModal() {
        this.isModalOpen = true;
        // Wait for DOM to update, then focus the heading
        window.requestAnimationFrame(() => {
            const heading = this.template.querySelector('#modal-heading');
            if (heading) {
                heading.focus();
            }
        });
    }

    // Close the modal
    @api closeModal() {
        this.isModalOpen = false;
    }

    // Handle field changes from lightning-inputs
    handleFieldChange(event) {
        const field = event.target.dataset.field;
        const value = event.target.value;
        if (field) {
            this.editableRecord = { ...this.editableRecord, [field]: value };
        }
    }

    // Handle Save Action - dispatch updated record in event.detail
    handleSave() {
        const saveEvent = new CustomEvent('save', {
            detail: { ...this.editableRecord },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(saveEvent);
        this.closeModal();
    }
}
