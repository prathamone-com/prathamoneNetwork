# PrathamOne: Supabase Auth & Multi-Role Configuration

This document defines how user authentication and role-based access control (RBAC) are handled in the PrathamOne Sovereign Network.

---

## 1. User Metadata & Custom Claims (JWT)

We use Supabase Auth with **GoTrue custom claims** to ensure that `role` and `institute_id` are baked into the JWT for fast, secure RLS checks.

### 1.1 Custom Claims (JWT)
| Key | Type | Description |
| :--- | :--- | :--- |
| `role` | `enum` | `student`, `lecturer`, `parent`, `admin`, `superadmin` |
| `institute_id` | `uuid` | The unique ID of the institute the user belongs to. |
| `is_verified` | `boolean` | Whether the user has completed their onboarding/KYC. |

---

## 2. Onboarding Flow (metadata)

When a user is created (e.g., via bulk import or signup), the following `user_metadata` is stored in `auth.users`:

| Key | Description |
| :--- | :--- |
| `full_name` | User's display name. |
| `phone` | Mobile number for OTP login. |
| `onboarding_complete` | Boolean flag for UI redirection. |
| `scholar_id` | (Students only) The institute-assigned ID. |

---

## 3. Row Level Security (RLS) Logic

Every table includes an `institute_id` column. RLS policies follow this template:

```sql
-- Dynamic Institute-Based Isolation
CREATE POLICY "tenant_isolation" 
ON public.<table_name>
FOR ALL
USING (
  institute_id = (auth.jwt() ->> 'institute_id')::uuid
);
```

### 3.1 Role-Specific Filters
- **Students**: Can only see their own rows in `student_progress` and `submissions`.
- **Lecturers**: Can see all student data *within the same institute*.
- **Parents**: Can see `student_progress` ONLY for students where `parent_id = auth.uid()`.

---

## 4. Auth Implementation Steps (Phase 1)

1.  **JWT Hook**: Create a Supabase Edge Function or Database function to automatically append `role` and `institute_id` to the JWT upon login.
2.  **Public Profile Sync**: Use a database trigger (`on_auth_user_created`) to sync new `auth.users` to the `public.profiles` table.

---

> [!CAUTION]
> **Claim Integrity**: Never allow users to set their own `role` or `institute_id` via the client-side `updateUser`. These MUST be handled server-side through administrative functions.
