# Refine Strategic Delivery & BMAD Framework

## Objective
Refine the **Strategic Delivery** page and the **BMAD Framework** visualization to align with "Enterprise Polish" feedback. This involves updating the visual hierarchy of the diagram and standardizing role terminology to be more strategic and less compliance-focused.

## Context
The user has provided specific feedback on the "BMAD" (Business-Model Agile Delivery) operational model. They want to move away from "audit/compliance" language towards "assurance/governance" language.
- **Roles to Standardize**:
    - AI Governance Architect (Shape)
    - AI Risk Assurance Lead (Validate)
    - AI Governance Steward (Operate)
- **Visual Concept**:
    - **Center**: ASIMOV-AI
    - **Inner Ring (Halo)**: Principles (Ethics, Fairness, Security, Transparency, Accountability)
    - **Outer Ring**: BMAD Lifecycle Phases (Discover, Shape, Deliver, Validate, Operate)

## Implementation Plan

### 1. Visualization (Infographic)
- **Action**: Generate a new high-quality infographic using `generate_image`.
- **Prompt Details**: 
    - Professional circular diagram.
    - **Core**: "ASIMOV-AI"
    - **Inner Ring**: Key Principles (Ethics, Fairness, Security, Transparency, Accountability).
    - **Outer Ring**: 5 BMAD Phases (Discover, Shape, Deliver, Validate, Operate).
    - **Style**: Enterprise tech, clean, blue/purple gradients, high contrast text.

### 2. Strategic Delivery Page Updates (`src/pages/StrategicDelivery.tsx`)
- **Action**: Update the content to match the new image and terminology.
- **Specific Changes**:
    - Ensure the text descriptions for the phases match the "Enterprise Polish" roles exactly.
    - Update the image import to use the new generated infographic.
    - Review the "Service Pillars" or "Methodology" text to ensure it advocates for "Delivery Assurance" rather than just "Compliance".

### 3. Review & Explanation
- **Action**: Answer the user's question about "explaining this to a 12-year-old" to clarify the site's advocating purpose (Safe, High-Speed Innovation).

## Verification
- Check that the new image renders correctly on the page.
- Verify that role names in the code match the agreed definitions.
