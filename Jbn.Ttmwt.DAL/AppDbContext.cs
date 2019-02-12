using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Jbn.Ttmwt.DAL
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Device> Device { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<Proctor> Proctor { get; set; }
        public virtual DbSet<Remarks> Remarks { get; set; }
        public virtual DbSet<Test> Test { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Device>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("UQ_Device_Name")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(e => e.FirstVisitedOn).HasDefaultValueSql("(sysdatetime())");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Proctor>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Remarks>(entity =>
            {
                entity.HasIndex(e => e.TestId)
                    .HasName("UQ_Remarks_TestId")
                    .IsUnique();

                entity.Property(e => e.Content).IsRequired();

                entity.HasOne(d => d.Test)
                    .WithOne(p => p.Remarks)
                    .HasForeignKey<Remarks>(d => d.TestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Remarks_TestId");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.ComfortPace1).HasColumnType("decimal(4, 2)");

                entity.Property(e => e.ComfortPace2).HasColumnType("decimal(4, 2)");

                entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())");

                entity.Property(e => e.MaxPace1).HasColumnType("decimal(4, 2)");

                entity.Property(e => e.MaxPace2).HasColumnType("decimal(4, 2)");

                entity.HasOne(d => d.Device)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.DeviceId)
                    .HasConstraintName("FK_Test_DeviceId");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK_Test_PatientId");

                entity.HasOne(d => d.Proctor)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.ProctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Test_ProctorId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}